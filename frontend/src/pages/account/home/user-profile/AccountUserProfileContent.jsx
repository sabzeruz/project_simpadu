import {PersonalInfo} from './blocks';
const AccountUserProfileContent = () => {
  return (
    <div className="h-full">
      <div className="col-span-1 h-full">
        <div className="grid gap-5 lg:gap-7.5 h-full">
          <div className="w-full h-full flex flex-col">
            <PersonalInfo className="flex-1 h-full" />
          </div>
        </div>
      </div>

      {/* <div className="col-span-1">
        <div className="grid gap-5 lg:gap-7.5">
          <StartNow />

          <CalendarAccounts />

          <Connections url="#" />

          <RecentUploads title="My Files" />
        </div>
      </div> */}
    </div>
  );
};
export { AccountUserProfileContent };