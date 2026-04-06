let totalMenit = 0;
let jumlahAktivitas = 0;

function tambahAktivitas() {
    let aktivitas = document.getElementById("aktivitas").value;
    let mulai = document.getElementById("mulai").value;
    let selesai = document.getElementById("selesai").value;

    if (aktivitas === "" || mulai === "" || selesai === "") {
        alert("Isi semua data!");
        return;
    }

    // ubah ke menit
    let mulaiMenit = convertKeMenit(mulai);
    let selesaiMenit = convertKeMenit(selesai);

    let durasi = selesaiMenit - mulaiMenit;

    if (durasi <= 0) {
        alert("Waktu selesai harus lebih besar dari mulai!");
        return;
    }

    totalMenit += durasi;
    jumlahAktivitas++;

    updateTotal();

    let li = document.createElement("li");
    li.textContent = `${aktivitas} (${mulai} - ${selesai}) — ${durasi} menit `;

    // tombol hapus
    let btnHapus = document.createElement("button");
    btnHapus.textContent = "Hapus";

    btnHapus.onclick = function () {
        li.remove();
        totalMenit -= durasi;
        jumlahAktivitas--;
        updateTotal();
    };

    li.appendChild(btnHapus);

    document.getElementById("listAktivitas").appendChild(li);

    // reset input
    document.getElementById("aktivitas").value = "";
    document.getElementById("mulai").value = "";
    document.getElementById("selesai").value = "";
}

// fungsi ubah jam ke menit
function convertKeMenit(waktu) {
    let [jam, menit] = waktu.split(":").map(Number);
    return jam * 60 + menit;
}

// update total
function updateTotal() {
    document.getElementById("total").innerText =
        `Total: ${totalMenit} menit (${jumlahAktivitas} aktivitas)`;
}