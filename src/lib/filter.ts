// src/utils/filter-utils.ts

/**
 * Esta função decide se adiciona ou remove um valor de uma lista de filtros na URL.
 * Exemplo: Se temos "wood" e clicamos em "leather", vira "wood,leather".
 * Se clicamos em "wood" novamente, sobra apenas "leather".
 */
export const toggleFilterValue = (
  currentValues: string | null,
  valueToToggle: string,
): string | null => {
  // 1. Se não há valores, apenas adicionamos o novo
  if (!currentValues) return valueToToggle;

  // 2. Transformamos a string da URL em um array (ex: "wood,metal" -> ["wood", "metal"])
  const valuesArray = currentValues.split(",");

  // 3. Verificamos se o valor já existe no array
  const valueIndex = valuesArray.indexOf(valueToToggle);

  if (valueIndex > -1) {
    // Se existir, removemos (o usuário está desmarcando)
    valuesArray.splice(valueIndex, 1);
  } else {
    // Se não existir, adicionamos (o usuário está marcando)
    valuesArray.push(valueToToggle);
  }

  // 4. Retornamos a string unida por vírgulas ou null se estiver vazio
  return valuesArray.length > 0 ? valuesArray.join(",") : null;
};
