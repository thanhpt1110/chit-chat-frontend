type ShowProps = {
  when: boolean;
  children: React.ReactNode;
};
function Show({ when, children }: ShowProps) {
  return when && children;
}

export default Show;
