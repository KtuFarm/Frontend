import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Label } from 'components/Label';

import { MedicamentSelect } from './MedicamentSelect';

export const SaleForm = (): JSX.Element => {
  return (
    <form className="md:w-2/3">
      <div className="flex flex-wrap -m-2">
        <div className="w-full p-2">
          <MedicamentSelect onSelect={(value) => console.log(value)} />
        </div>

        <div className="w-1/2 p-2">
          <div className="relative">
            <Label htmlFor="address">Adresas</Label>
            <Input type="text" id="address" name="address" />
          </div>
        </div>

        <div className="w-1/2 p-2">
          <div className="relative">
            <Label htmlFor="city">Miestas</Label>
            <Input type="text" id="city" name="city" />
          </div>
        </div>

        <div className="w-full p-2">
          <Button.Primary type="submit">Pridėti vaistinę</Button.Primary>
        </div>
      </div>
    </form>
  );
};
