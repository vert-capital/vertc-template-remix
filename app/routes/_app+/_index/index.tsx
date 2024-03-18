import { LinksFunction } from '@remix-run/node';
import { MetaFunction, useMatches } from '@remix-run/react';
import config from '~/common/config';
import { UserModel } from '~/models/user.model';
import customStyle from './custom.css?url';

export const meta: MetaFunction = () => {
  return [{ title: `Dashboard | ${config.appName}` }];
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: customStyle },
  {
    rel: 'preload',
    as: 'image',
    href: '/resources/images/illustration1.svg',
  },
];

export default function Index() {
  const { user } = useMatches()[1].data as {
    user: UserModel;
  };
  return (
    <div
      id="content-main"
      className="w-full flex flex-col items-start justify-between"
    >
      <div></div>
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="text-3xl">
          Olá, <strong>{user.nomeCompleto}</strong>
        </h1>
        <p className="font-extralight">
          Bem vindo(a) ao <strong>{config.appName}</strong>.
        </p>
      </div>

      <div className="w-full flex justify-end items-center">
        <img
          className="w-20 lg:w-[8%]"
          src="/resources/images/illustration1.svg"
          alt="illustration"
          height={100}
          width={100}
        />
      </div>
    </div>
  );
}
