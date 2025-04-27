import { ChannelStats, EarningsChart, EntryCallout, Highlights, TeamMeeting, Teams } from './blocks';

const Demo1LightSidebarContent = () => {
  return (
      
    <div className="flex flex-col gap-5 lg:gap-7.5">
      {/* ChannelStats full width */}
      <div className="w-full">
        <ChannelStats />
      </div>

      {/* Komponen lain bisa ditaruh di bawah */}
      {/* <EarningsChart /> */}
      {/* <EntryCallout /> */}
      {/* dst... */}
    </div>
  );
};

export { Demo1LightSidebarContent };
