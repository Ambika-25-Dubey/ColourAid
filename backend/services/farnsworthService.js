const normalizeOrder = (order) => {
  if (!Array.isArray(order)) return null;
  return order.map((value) => Number(value));
};

const clampValue = (value, min, max) => Math.max(min, Math.min(max, value));

const calculateFarnsworthD15Results = (order = []) => {
  const normalizedOrder = normalizeOrder(order);
  if (!normalizedOrder || normalizedOrder.length < 2) {
    return null;
  }

  const pairs = [];
  let totalError = 0;
  let crossingErrors = 0;

  for (let i = 0; i < normalizedOrder.length - 1; i += 1) {
    const current = normalizedOrder[i];
    const next = normalizedOrder[i + 1];
    const diff = Math.abs(current - next);
    totalError += diff;
    if (diff >= 4) {
      crossingErrors += 1;
    }
    pairs.push({ current, next, diff });
  }

  const idealScore = normalizedOrder.length - 1;
  const errorMargin = Math.max(0, totalError - idealScore);
  const severity = clampValue(Math.round((errorMargin / 40) * 100), 0, 100);

  let deficiencyType = "normal";
  let description = "No significant color vision deficiency pattern detected.";

  if (crossingErrors > 0 || errorMargin > 4) {
    deficiencyType = "mild";
    description = "Your arrangement shows minor deviations that may indicate mild color confusion.";

    const redGreenHint = pairs.some(({ current, next, diff }) => {
      const sum = current + next;
      return diff >= 6 && sum >= 12 && sum <= 18;
    });
    const blueYellowHint = pairs.some(({ current, next, diff }) => {
      const sum = current + next;
      return diff >= 5 && sum >= 19;
    });

    if (crossingErrors >= 2 || errorMargin > 8) {
      deficiencyType = "possible_red_green";
      description = "Your arrangement pattern may indicate a red-green color vision deficiency.";
      if (blueYellowHint && !redGreenHint) {
        deficiencyType = "possible_blue_yellow";
        description = "Your arrangement pattern may indicate a blue-yellow color vision deficiency.";
      }
    } else if (blueYellowHint && !redGreenHint) {
      deficiencyType = "possible_blue_yellow";
      description = "Your arrangement pattern may indicate a blue-yellow color vision deficiency.";
    }
  }

  return {
    totalError,
    errorMargin,
    crossingErrors,
    severity,
    deficiencyType,
    description,
  };
};

export default {
  calculateFarnsworthD15Results,
};
