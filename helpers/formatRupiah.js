function formatRupiah(number) {
  if (!number || isNaN(number)) return "Rp 0";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
}

module.exports = { formatRupiah };
