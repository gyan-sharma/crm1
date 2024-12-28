import { BlockchainOpportunity } from '../types';

export function fillFormWithData(form: HTMLFormElement, data: Partial<BlockchainOpportunity>) {
  // Helper to set form field value
  const setValue = (name: string, value: any) => {
    const element = form.elements.namedItem(name) as HTMLInputElement | null;
    if (!element) {
      console.warn(`Element with name "${name}" not found`);
      return;
    }
    
    if (element.type === 'checkbox') {
      element.checked = !!value;
    } else {
      element.value = value?.toString() || '';
    }
  };

  // Basic Info
  setValue('title', data.title);
  setValue('customer_name', data.customer_name);
  setValue('contact_info', data.contact_info);
  setValue('sales_rep_id', data.sales_rep_id);
  setValue('stage', data.stage);
  setValue('priority', data.priority);
  setValue('estimated_value', data.estimated_value);
  setValue('close_date', data.close_date);
  setValue('interaction_log', data.interaction_log);
  setValue('industry', data.industry);
  setValue('lead_source', data.lead_source);
  setValue('forecast_category', data.forecast_category);

  // Technical Details
  setValue('platform_type', data.platform_type);
  setValue('deployment_type', data.deployment_type);
  setValue('nodes', data.technical_requirements?.nodes);

  // Commercial Details
  setValue('license_type', data.license_type);
  setValue('budget_license', data.budget?.license);
  setValue('budget_services', data.budget?.services);
  setValue('budget_maintenance', data.budget?.maintenance);

  // Additional Info
  setValue('country', data.country);
  setValue('use_case', data.use_case);
  setValue('notes', data.notes);

  // Stakeholders
  data.stakeholders?.forEach((stakeholder, index) => {
    setValue(`stakeholder_name_${index}`, stakeholder.name);
    setValue(`stakeholder_role_${index}`, stakeholder.role);
    setValue(`stakeholder_contact_${index}`, stakeholder.contact);
  });

  // Services and Compliance
  if (Array.isArray(data.services_required)) {
    data.services_required.forEach(service => {
      setValue(`services_required_${service}`, true);
    });
  }

  if (Array.isArray(data.compliance_requirements)) {
    data.compliance_requirements.forEach(requirement => {
      setValue(`compliance_requirements_${requirement}`, true);
    });
  }
}