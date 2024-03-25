import * as React from 'react';
import { SelectInput, useField, } from 'payload/components/forms';

export const CustomSelectComponent: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path });
  const [options, setOptions] = React.useState([]);

  // Fetch options on component mount
  React.useEffect(() => {
    const fetchOptions = async () => {
    try {
        const response = await fetch('/api/plans');
        const data = await response.json();
        const countryOptions = data.docs.map((plan: any) => {
            return {
                label: `${plan.name}`,
                value: plan.id,
            };
        });

        setOptions(countryOptions.sort(
            (a: { label: string }, b: { label: string }) => a.label.localeCompare(b.label)
        ));
    } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOptions();
  }, []);



  return (
    <div>
      <label className='field-label'>
        Custom Select
      </label>
      <SelectInput
        path={path}
        name={path}
        options={options}
        value={value}
        onChange={(e) => setValue(e.value)}
      />
    </div>
  )
};