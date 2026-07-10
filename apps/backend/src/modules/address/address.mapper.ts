import type { Address } from '@freshly/contracts';
import type { SelectAddress } from '@freshly/db';

export const toAddress = (row: SelectAddress): Address => ({
  id: row.id as Address['id'],
  label: row.label,
  value: row.value,
  city: row.city,
  street: row.street,
  house: row.house,
  housing: row.housing,
  entrance: row.entrance,
  floor: row.floor,
  apartment: row.apartment,
  intercom: row.intercom,
  comment: row.comment,
  fiasId: row.fiasId,
  isDefault: row.isDefault,
  latitude: row.latitude,
  longitude: row.longitude
});
