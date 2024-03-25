import { useState, useEffect } from 'react';
import * as React from 'react';

const PlanSelector = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [plans, setPlans] = useState<any[]>([]);
  const [selectedPlanData, setSelectedPlanData] = useState<any>({ time: 0, price: 0 });

  useEffect(() => {
    // Función para obtener los datos de los planes desde Payload CMS
    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/plans');
        const data = await response.json();
        setPlans(data);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlans();
  }, []);

  const handlePlanChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPlanSlug = event.target.value;
    setSelectedPlan(selectedPlanSlug);

    // Encontrar los datos del plan seleccionado
    const plan = plans.find((p) => p.slug === selectedPlanSlug);
    if (plan) {
      setSelectedPlanData({ time: plan.time, price: plan.price });
    } else {
      setSelectedPlanData({ time: 0, price: 0 });
    }
  };

  return (
    <div>
      <select value={selectedPlan} onChange={handlePlanChange}>
        <option value="">Seleccione un plan</option>
        {plans.map((plan) => (
          <option key={plan.slug} value={plan.slug}>{plan.name}</option>
        ))}
      </select>
      <div>
        <label>Time: </label>
        <input type="text" value={selectedPlanData.time} readOnly />
      </div>
      <div>
        <label>Price: </label>
        <input type="text" value={selectedPlanData.price} readOnly />
      </div>
    </div>
  );
};

export default PlanSelector;
