import { Fragment } from 'react';
import { toAbsoluteUrl } from '@/utils/Assets';

const ChannelStats = () => {
  const items = [
    { logo: 'user_add.svg', info: '9.3k', desc: 'Iqbal geming', path: '' },
    { logo: 'user_add.svg', info: '24k', desc: 'Hifni 4 Tak', path: '' },
    { logo: 'user_add.svg', info: '608', desc: 'Saidi bantai PHP', path: '' },
    { logo: 'user_add.svg', logoDark: 'user_add.svg', info: '2.5k', desc: 'Cahaya Bintang', path: '' }
  ];

  const renderItem = (item, index) => {
    return (
      <div key={index} className="flex flex-col justify-between gap-6 bg-cover bg-no-repeat channel-stats-bg rounded-lg p-4 w-full max-w-[180px]">
        {item.logoDark ? (
          <>
            <img src={toAbsoluteUrl(`/media/brand-logos/${item.logo}`)} className="dark:hidden w-7" alt="" />
            <img src={toAbsoluteUrl(`/media/brand-logos/${item.logoDark}`)} className="light:hidden w-7" alt="" />
          </>
        ) : (
          <img src={toAbsoluteUrl(`/media/brand-logos/${item.logo}`)} className="w-7" alt="" />
        )}

        <div className="flex flex-col gap-1">
          <span className="text-3xl font-semibold text-gray-900 dark:text-white">{item.info}</span>
          <span className="text-sm font-normal text-gray-700 dark:text-gray-300">{item.desc}</span>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <style>
        {`
          .channel-stats-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1600/bg-3.png')}');
          }
          .dark .channel-stats-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1600/bg-3-dark.png')}');
          }
        `}
      </style>

      {/* Grid container utama */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full justify-items-center">
        {items.map((item, index) => renderItem(item, index))}
      </div>
    </Fragment>
  );
};

export { ChannelStats };
