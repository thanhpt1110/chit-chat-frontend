import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SearchOutlineIcon } from "../../components/icons/SearchOutlineIcon";
import { XIcon } from "../../components/icons/XIcon";
import ImageWithFallback from "../../components/ImageWithFallback";
import { useLazyGetProfileSearchQuery } from "../../data/profile/profile.api";
import { ProfileSearchDTO } from "../../data/profile/profile.service";
import { APP_ROUTE } from "../../helpers/constants/route.constant";
import { truncateText } from "../../utils/truncateText";

type SearchInput = {
  searchKeyword: string;
};

const GET_PROFILE_SEARCH_PAGE_SIZE = 10;

function SearchBar() {
  const formMethods = useForm<SearchInput>({
    defaultValues: {
      searchKeyword: "",
    },
  });
  const navigate = useNavigate();
  const { control, reset, watch, handleSubmit } = formMethods;

  const [profileSearchData, setProfileSearchData] = useState<
    ProfileSearchDTO[]
  >([]);

  const [getProfileSearch] = useLazyGetProfileSearchQuery();

  const onSubmit = async (data: SearchInput) => {
    if (!data.searchKeyword) {
      return;
    }
    if (data.searchKeyword.length > 1 && data.searchKeyword[0] === "#") {
      navigate(APP_ROUTE.MAIN.SEARCH_POST, {
        state: { searchKeyword: data.searchKeyword.slice(1) },
      });
      return;
    }
    getProfileSearch({
      SearchText: data.searchKeyword,
      PageIndex: 0,
      PageSize: GET_PROFILE_SEARCH_PAGE_SIZE,
    })
      .unwrap()
      .then((profiles: ProfileSearchDTO[]) => {
        setProfileSearchData(profiles);
      })
      .catch(() => {});
  };

  return (
    <div className="mt-2 w-full">
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="searchKeyword"
            control={control}
            render={({ field }) => (
              <div className="flex rounded-lg bg-[#EFEFEF] flex-row w-full items-center px-3">
                <SearchOutlineIcon className="text-gray-400" />
                <input
                  {...field}
                  autoComplete="off"
                  className="focus:outline-none font-normal bg-transparent w-full h-full px-2 py-3"
                  placeholder="Search people or post..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // Ngăn Enter reload trang
                      handleSubmit(onSubmit)();
                    }
                  }}
                />
                {watch("searchKeyword") && (
                  <button
                    onClick={() => {
                      reset();
                      setProfileSearchData([]);
                    }}
                    className="bg-gray-300 px-1 py-1 rounded-full"
                  >
                    <XIcon className="h-2 w-2 text-white" />
                  </button>
                )}
              </div>
            )}
          />
        </form>
      </FormProvider>
      <div className="flex flex-col mt-2">
        {profileSearchData &&
          profileSearchData.map((profile) => (
            <button
              onClick={() => {
                navigate(APP_ROUTE.MAIN.PROFILE(profile.id));
              }}
              className="w-full py-2 px-4 rounded-lg hover:bg-gray-100 flex flex-row justify-between"
              key={profile.id}
            >
              <div className="flex flex-row gap-3">
                <ImageWithFallback alt="" src={profile.avatarUrl} />
                <div className="flex flex-col justify-start">
                  <div className="text-sm font-semibold text-start">
                    {profile.displayName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {truncateText(profile.bio, 20)}
                  </div>
                </div>
              </div>
            </button>
          ))}
      </div>
    </div>
  );
}

export default SearchBar;
