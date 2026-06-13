// Shared label maps + helpers for apartments.

export const apartmentTypeLabels = {
  studio: "Студио",
  "1room": "Едностаен",
  "2room": "Двустаен",
  "3room": "Тристаен",
  "4room": "Четиристаен",
  maisonette: "Мезонет",
  atelier: "Ателие",
};

export const apartmentStatusLabels = {
  available: "Свободен",
  reserved: "Резервиран",
  sold: "Продаден",
};

// Bootstrap-ish badge class per status.
export const apartmentStatusClass = {
  available: "status-available",
  reserved: "status-reserved",
  sold: "status-sold",
};

export const formatPrice = (apartment) => {
  if (apartment.priceOnRequest || !apartment.price) return "Цена при запитване";
  return new Intl.NumberFormat("bg-BG").format(apartment.price) + " €";
};
