const XLSX = require('xlsx');
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const prisma = new PrismaClient();

function cleanKey(k){ return String(k).trim(); }

async function main() {
  const filePath = path.join(__dirname, 'data.xlsx');
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rawRows = XLSX.utils.sheet_to_json(sheet);

  // Bersihin spasi di header kayak ' Harga Jual '
  const rows = rawRows.map(r => {
    const o = {};
    for (const k in r) o[cleanKey(k)] = r[k];
    return o;
  });

  console.log(`Ketemu ${rows.length} produk`);
  console.log('Contoh:', rows[0]);

  await prisma.product.deleteMany({});

  let masuk = 0;
  for (const r of rows) {
    const kode = String(r['Kode'] || '').trim();
    const nama = String(r['Nama Barang'] || r['Nama'] || '').trim();
    let hargaRaw = r['Harga Jual'] || r['Harga'] || 0;
    if (typeof hargaRaw === 'string') hargaRaw = hargaRaw.replace(/[^0-9]/g,'');
    const harga = parseFloat(hargaRaw) || 0;
    const satuan = String(r['Satuan'] || '').trim();

    if (!nama) continue;

    await prisma.product.create({
      data: {
        sku: kode || `SKU-${masuk+1}`,
        nama: nama,
        harga: harga,
        deskripsi: `${nama} - ${satuan}`.trim(),
        kategori: 'Pangan',
        stok: 100
      }
    });
    masuk++;
  }
  console.log(`DONE! MASUK ${masuk} PRODUK!`);
}

main().finally(()=>prisma.$disconnect());