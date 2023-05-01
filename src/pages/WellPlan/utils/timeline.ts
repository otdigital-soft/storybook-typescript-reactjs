export function calculatePhaseDuration(
  phaseData: { date: string }[],
  totalData: { date: string }[],
) {
  if (phaseData.length === 1) {
    return (
      1 / totalData.filter((common) => common.date === phaseData[0].date).length
    );
  } else {
    return (
      phaseData.length -
      2 +
      1 /
        totalData.filter((common) => common.date === phaseData[0].date).length +
      1 /
        totalData.filter(
          (common) => common.date === phaseData[phaseData.length - 1].date,
        ).length
    );
  }
}
