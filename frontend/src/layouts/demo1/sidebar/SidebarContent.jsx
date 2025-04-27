import { SidebarMenu } from './';
const SidebarContent = ({
  // eslint-disable-next-line react/prop-types
  height = 0
}) => {
  return <div className="sidebar-content flex grow shrink-0 py-5 pe-2">
      <div className=" grow shrink-0 flex ps-2 lg:ps-5 pe-1 lg:pe-3" style={{
      ...(height > 0 && {
        height: `${height}px`
      })
    }}>
        <SidebarMenu />
      </div>
    </div>;
};
export { SidebarContent };