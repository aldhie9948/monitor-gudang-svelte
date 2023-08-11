export interface ITypeBarang {
  id_tipe: number;
  kode: string;
  nama: string;
  jenis: string;
  total: number;
}

export interface IStokBarang {
  kode_barang: string;
  nama_barang: string;
  satuan: string;
  kategori: string;
  tipe_barang: string;
  gudang: string;
  active: string;
  stok: string;
  kode_tipe: string;
  nama_tipe: string;
}

export interface IMaterialCust {
  kode_barang: string;
  nama_barang: string;
  satuan: string;
  kategori: string;
  tipe_barang: string;
  gudang: string;
  stok: string;
  harga_beli: string;
  qrcode: string;
  active: string;
}

export function isIStokBarang(obj: object): obj is IStokBarang {
  return (obj as IStokBarang).kode_tipe !== undefined;
}

export function isIMaterialCust(obj: object): obj is IMaterialCust {
  return (obj as IMaterialCust).qrcode !== undefined;
}

export type StatusStock = -1 | 0 | 1;

export interface IHistoriStokBarang {
  nama_barang: string;
  gudang: string;
  kode_barang: string;
  masuk: string;
  keluar: string;
  sisa_stok: string;
  no_lot: string;
  tanggal: string;
  id: number;
}

export interface IRecordStock {
  status: StatusStock;
  total: number;
}

export interface IDetailTransactionParams {
  kode: string;
  start: string;
  end: string;
  limit?: number;
}
