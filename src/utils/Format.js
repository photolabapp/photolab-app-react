export const formatAsCurrency = amount =>
    parseFloat(amount, 0.0)
        .toFixed(2)
        .replace('.', ',')
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');