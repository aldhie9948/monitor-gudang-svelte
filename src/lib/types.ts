// new types

export interface IDetailTransactionParams {
  code: string;
  start: string;
  end: string;
  limit?: number;
}

export interface IRawMaterialItem {
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

export interface IRawMaterialType {
  id_tipe: number;
  kode: string;
  nama: string;
  jenis: string;
  total: number;
}

export interface IRawMaterialTransaction {
  nama_barang: string;
  gudang: string;
  satuan: string;
  kode_barang: string;
  masuk: string;
  keluar: string;
  sisa_stok: string;
  no_lot: string;
  tanggal: string;
  id: number;
}

export interface IRawMaterialPartItems {
  id: string;
  jenis_barang: string;
  kode_material: string;
  material: string;
  satuan: string;
  kode_barang: string;
  bruto: string;
  nama_barang: string;
  hasil_pcs: string;
}

export type StatusCode = -1 | 0 | 1;

export interface IMaterialCustItem {
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
