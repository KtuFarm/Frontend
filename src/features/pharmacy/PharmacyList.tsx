import { Button } from 'components/Button';
import { Container } from 'components/Container';
import { Content } from 'components/Content';
import { Modal } from 'components/Modal';
import { Pagination } from 'components/Pagination';

export const PharmacyList = (): JSX.Element => {
  return (
    <Container>
      <Content withPadding={false}>
        <div className="flex flex-col items-center justify-between w-full p-8 sm:flex-row">
          <h1 className="text-2xl font-medium text-gray-900 sm:text-3xl title-font">
            Vaistinės
          </h1>

          <Button.Primary className="sm:ml-2">Pridėti vaistinę</Button.Primary>
        </div>
        <table className="w-full text-left whitespace-no-wrap table-auto table-stripped">
          <thead>
            <tr className="text-sm font-medium tracking-wider text-gray-900 border-b-2 border-gray-400 title-font">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Filialo nr.</th>
              <th className="px-4 py-3">Adresas</th>
              <th className="px-4 py-3">Miestas</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-3">1</td>
              <td className="px-4 py-3">123</td>
              <td className="px-4 py-3">Studentų g. 312</td>
              <td className="px-4 py-3">Kaunas</td>
              <td className="px-4 py-3 text-right">
                <button
                  className="mr-4 text-indigo-500 outline-none appearance-none hover:underline hover:text-indigo-600 focus:outline-none"
                  type="button"
                >
                  Redaguoti
                </button>
                <button
                  className="text-red-500 outline-none appearance-none hover:underline hover:text-red-600 focus:outline-none"
                  type="button"
                >
                  Pašalinti
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">2</td>
              <td className="px-4 py-3">456</td>
              <td className="px-4 py-3">Taikos pr. 432</td>
              <td className="px-4 py-3">Kaunas</td>
              <td className="px-4 py-3 text-right">
                <button
                  className="mr-4 text-indigo-500 outline-none appearance-none hover:underline hover:text-indigo-600 focus:outline-none"
                  type="button"
                >
                  Redaguoti
                </button>
                <button
                  className="text-red-500 outline-none appearance-none hover:underline hover:text-red-600 focus:outline-none"
                  type="button"
                >
                  Pašalinti
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">3</td>
              <td className="px-4 py-3">789</td>
              <td className="px-4 py-3">Gedimino g. 53</td>
              <td className="px-4 py-3">Vilnius</td>
              <td className="px-4 py-3 text-right">
                <button
                  className="mr-4 text-indigo-500 outline-none appearance-none hover:underline hover:text-indigo-600 focus:outline-none"
                  type="button"
                >
                  Redaguoti
                </button>
                <button
                  className="text-red-500 outline-none appearance-none hover:underline hover:text-red-600 focus:outline-none"
                  type="button"
                >
                  Pašalinti
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">4</td>
              <td className="px-4 py-3">264</td>
              <td className="px-4 py-3">Vytauto g. 54</td>
              <td className="px-4 py-3">Vilnius</td>
              <td className="px-4 py-3 text-right">
                <button
                  className="mr-4 text-indigo-500 outline-none appearance-none hover:underline hover:text-indigo-600 focus:outline-none"
                  type="button"
                >
                  Redaguoti
                </button>
                <button
                  className="text-red-500 outline-none appearance-none hover:underline hover:text-red-600 focus:outline-none"
                  type="button"
                >
                  Pašalinti
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </Content>
      <Pagination />
      <Modal
        isOpen={false}
        title="Ištrinti vaistinę"
        content="Ar tikrai norite ištrinti vaistinę? Vaistinės duomenys bus pašalinti visam laikui. Šio veiksmo negalima anuliuoti."
        buttons={
          <>
            <Button.Danger className="sm:ml-2">Ištrinti</Button.Danger>
            <Button.Secondary>Atšaukti</Button.Secondary>
          </>
        }
      />
    </Container>
  );
};
