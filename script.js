let totalMenit = 0;
let jumlahAktivitas = 0;

// ambil data dari localStorage saat pertama load
window.onload = function () {
    let data = JSON.parse(localStorage.getItem("aktivitasList")) || [];

    data.forEach(item => {
        tampilkanAktivitas(item.aktivitas, item.mulai, item.selesai);
    });
};

function tambahAktivitas() {
    let aktivitas = document.getElementById("aktivitas").value;
    let mulai = document.getElementById("mulai").value;
    let selesai = document.getElementById("selesai").value;

    if (aktivitas === "" || mulai === "" || selesai === "") {
        alert("Isi semua data!");
        return;
    }

    let mulaiMenit = convertKeMenit(mulai);
    let selesaiMenit = convertKeMenit(selesai);
    let durasi = selesaiMenit - mulaiMenit;

    if (durasi <= 0) {
        alert("Waktu selesai harus lebih besar dari mulai!");
        return;
    }

    // simpan ke localStorage
    let data = JSON.parse(localStorage.getItem("aktivitasList")) || [];

    let itemBaru = { aktivitas, mulai, selesai };
    data.push(itemBaru);

    localStorage.setItem("aktivitasList", JSON.stringify(data));

    tampilkanAktivitas(aktivitas, mulai, selesai);

    // reset input
    document.getElementById("aktivitas").value = "";
    document.getElementById("mulai").value = "";
    document.getElementById("selesai").value = "";
}

function tampilkanAktivitas(aktivitas, mulai, selesai) {
    let mulaiMenit = convertKeMenit(mulai);
    let selesaiMenit = convertKeMenit(selesai);
    let durasi = selesaiMenit - mulaiMenit;

    totalMenit += durasi;
    jumlahAktivitas++;

    updateTotal();

    let li = document.createElement("li");
    li.textContent = `${aktivitas} (${mulai} - ${selesai}) — ${durasi} menit `;

    let btnHapus = document.createElement("button");
    btnHapus.textContent = "Hapus";

    btnHapus.onclick = function () {
        li.remove();

        totalMenit -= durasi;
        jumlahAktivitas--;

        updateTotal();

        hapusDariStorage(aktivitas, mulai, selesai);
    };

    li.appendChild(btnHapus);

    document.getElementById("listAktivitas").appendChild(li);
}

// hapus dari localStorage
function hapusDariStorage(aktivitas, mulai, selesai) {
    let data = JSON.parse(localStorage.getItem("aktivitasList")) || [];

    data = data.filter(item =>
        !(item.aktivitas === aktivitas &&
          item.mulai === mulai &&
          item.selesai === selesai)
    );

    localStorage.setItem("aktivitasList", JSON.stringify(data));
}

function convertKeMenit(waktu) {
    let [jam, menit] = waktu.split(":").map(Number);
    return jam * 60 + menit;
}

function updateTotal() {
    document.getElementById("total").innerText =
        `Total: ${totalMenit} menit (${jumlahAktivitas} aktivitas)`;
}