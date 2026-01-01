/**
 * Validates subscription creation data
 * @param {Object} data - Subscription data to validate
 * @returns {string|null} - Error message if validation fails, null otherwise
 */
export const validateCreateSubscription = (data) => {
  const requiredFields = ['name', 'amount', 'billingCycle', 'renewalDate'];

  // Check for required fields
  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      return `Missing required field: ${field}`;
    }
  }

  // Validate name
  if (typeof data.name !== 'string' || data.name.trim().length === 0) {
    return 'Name must be a non-empty string';
  }

  // Validate amount
  if (typeof data.amount !== 'number' || data.amount < 0) {
    return 'Amount must be a non-negative number';
  }

  // Validate billingCycle
  if (!['monthly', 'yearly'].includes(data.billingCycle)) {
    return 'Billing cycle must be either "monthly" or "yearly"';
  }

  // Validate renewalDate
  const renewalDate = new Date(data.renewalDate);
  if (isNaN(renewalDate.getTime())) {
    return 'Renewal date must be a valid date';
  }

  // Validate isTrial if provided
  if (data.isTrial !== undefined && typeof data.isTrial !== 'boolean') {
    return 'isTrial must be a boolean value';
  }

  // Validate source if provided
  if (data.source !== undefined && !['manual', 'email'].includes(data.source)) {
    return 'Source must be either "manual" or "email"';
  }

  return null;
};

