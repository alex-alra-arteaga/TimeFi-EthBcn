import { type NextPage } from "next";
import { Layout } from "~/components/Layout";
import {useRouter} from "next/router"

const About: NextPage = () => {

  const router = useRouter()
  return (
    <div className="dark:from-black dark:via-gray-800 dark:to-gray-700 bg-white bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900">
    <Layout>
      <section className="body-font min-h-screen transition-colors duration-500">
        <div className="container mx-auto px-5 py-24">
        <div className="mb-20 flex w-full flex-col flex-wrap items-center text-center">
        <h1 className="title-font mb-2 text-2xl font-medium text-white sm:text-3xl">
              Puntos claves de TimeFi
            </h1>
            <p className="w-full leading-relaxed text-white text-opacity-80 lg:w-1/2 dark:text-gray-300">
              Descubre en que nos diferenciamos de otras plataformas y que valor
              agregado te ofrecemos.
            </p>
          </div>
          <div className="-m-4 flex flex-wrap">
            <div className="p-4 md:w-1/2 xl:w-1/3">
              <div className="rounded-lg border border-gray-700 border-opacity-75 p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-blue-400">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h2 className="title-font mb-2 text-lg font-medium text-white">
                  ERC20 representando tu tiempo
                </h2>
                <p className="text-base leading-relaxed text-gray-300">
                  En TimeFi, tu tiempo se convierte en un activo tangible
                  mediante la creación de un token ERC20. Este token está
                  vinculado a las horas que estás dispuesto a ofrecer,
                  proporcionando un valor numérico y transferible a tus
                  servicios profesionales.
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/2 xl:w-1/3">
              <div className="rounded-lg border border-gray-700 border-opacity-75 p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-blue-400">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="6" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                  </svg>
                </div>
                <h2 className="title-font mb-2 text-lg font-medium text-white">
                  Mejora en el Flujo de Efectivo
                </h2>
                <p className="text-base leading-relaxed text-gray-300">
                  Nos enfocamos en solucionar los retrasos en los pagos que
                  afectan a consultores y profesionales, asegurando un flujo de
                  efectivo regular y reduciendo el riesgo de impago. No dependas
                  más de tercero para recibir lo que te pertenece.
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/2 xl:w-1/3">
              <div className="rounded-lg border border-gray-700 border-opacity-75 p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-blue-400">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h2 className="title-font mb-2 text-lg font-medium text-white">
                  Interacción de Fan a Ídolo como nunca antes
                </h2>
                <p className="text-base leading-relaxed text-gray-300">
                  Abordamos la falta de interacciones significativas en las
                  redes sociales, solucionamos problemas en la programación y
                  flujo de efectivo en consultas profesionales, y promovemos un
                  intercambio personalizado de conocimientos y experiencia.
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/2 xl:w-1/3">
              <div className="rounded-lg border border-gray-700 border-opacity-75 p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-blue-400">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path>
                  </svg>
                </div>
                <h2 className="title-font mb-2 text-lg font-medium text-white">
                  Ponemos fin a la programación Ineficiente
                </h2>
                <p className="text-base leading-relaxed text-gray-300">
                  Atacamos la falta de transparencia y las complicaciones en la
                  programación actual, facilitando la reserva de horarios para
                  clientes y la gestión de cancelaciones para consultores.
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/2 xl:w-1/3">
              <div className="rounded-lg border border-gray-700 border-opacity-75 p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-blue-400">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                  </svg>
                </div>
                <h2 className="title-font mb-2 text-lg font-medium text-white">
                  Tecnología sofisticada, experiencia sin complicaciones
                </h2>
                <p className="text-base leading-relaxed text-gray-300">
                  Utilizamos tecnología sofisticada, todo mientras mantenemos la
                  experiencia del usuario simple y libre de preocupaciones
                  técnicas.
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/2 xl:w-1/3">
              <div className="rounded-lg border border-gray-700 border-opacity-75 p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-blue-400">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h2 className="title-font mb-2 text-lg font-medium text-white">
                  Compensación justa
                </h2>
                <p className="text-base leading-relaxed text-gray-300">
                  Nos enfocamos en asegurar una compensación justa para
                  consultores altamente solicitados, reflejando su verdadero
                  valor de mercado y evitando la insatisfacción profesional.
                </p>
              </div>
            </div>
            <button className="mx-auto mt-16 flex rounded border-0 bg-blue-500 px-8 py-2 text-lg text-white hover:bg-blue-600 dark:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none" onClick={async () => {await router.push("/")}}>
              Volver a la página principal
            </button>
          </div>
        </div>
      </section>
    </Layout>
    </div>
  );
};

export default About;
