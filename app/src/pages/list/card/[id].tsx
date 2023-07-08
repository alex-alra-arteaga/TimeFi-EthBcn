import { useRouter } from 'next/router';
import Card from '../../../components/Card';
import CalendlyEmbed from '~/components/CalendlyEmbed';
import { Layout } from '~/components/Layout';
import { CardData, LiveDataProps } from '~/components/CardList';
import { liveDataPropsArray } from '~/constants';

export default function CardDisplay() {
  const router = useRouter();
  const cardMetaData = liveDataPropsArray[Number(router.query.id)] as LiveDataProps;

  return (
    <Layout>
      <div className="flex items-center justify-center dark:bg-gradient-to-r from-black via-gray-800 to-gray-700 min-h-screen">
          <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg
            className="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path
                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect width="100%" height="100%" strokeWidth={0} fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
          </svg>
        </div>
        <div className="w-1/3 pl-20">
          <CardData {...cardMetaData} />
        </div>
        <div className="w-2/3">
          <CalendlyEmbed />
        </div>
      </div>
    </Layout>
  )
}
