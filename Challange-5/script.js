let itemCounts = {
  waffle: 0,
  creme: 0,
  macaron: 0,
  tiramisu: 0,
  baklava: 0,
  pie: 0,
  cake: 0,
  brownie: 0,
  panna: 0,
};

let isSilActive = false;

// Tüm butonlara birer `originalHtml` verisi ekler, böylece her butonun başlangıç HTML içeriği kaydedilmiş olur.
$("button").each(function () {
  $(this).data("originalHtml", $(this).html());
});

// Bir öğenin miktarını artıran fonksiyon.
function increaseItem(spanId) {
  itemCounts[spanId]++; // İlgili öğenin sayısını 1 artır.
  $("#" + spanId).text(itemCounts[spanId]); // Sayıyı ekranda güncelle.
  updateTotalCount(); // Toplam sayıyı güncelle.
}

// Bir öğenin miktarını azaltan fonksiyon.
function decreaseItem(spanId, buttonElement) {
  if (itemCounts[spanId] === 1) {
    itemCounts[spanId] = 0;
    buttonElement.html(buttonElement.data("originalHtml")); // Butonun içeriğini geri yükle.
    buttonElement.removeClass("active-button").css("cursor", "pointer"); // Butonun stilini geri al.
  } else if (itemCounts[spanId] > 1) {
    itemCounts[spanId]--; // Sayıyı bir azalt.
    $("#" + spanId).text(itemCounts[spanId]); // Sayıyı ekranda güncelle.
  }
  updateTotalCount(); // Toplam sayıyı güncelle.
}

// "Sil" ve "Ekle" butonlarını kuran fonksiyon.
function setupSilEkleButtons(spanId, buttonElement) {
  buttonElement
    .find(".sil")
    .off("click")
    .click(function (event) {
      event.stopPropagation();
      if (isSilActive) return;
      isSilActive = true;

      decreaseItem(spanId, buttonElement);

      setTimeout(() => {
        isSilActive = false;
      }, 0);
    });

  buttonElement
    .find(".ekle")
    .off("click")
    .click(function (event) {
      event.stopPropagation();
      if (isSilActive) return;
      increaseItem(spanId);
    });
}

// Toplam sayıyı hesaplayan fonksiyon
function getTotalCount() {
  let total = 0;
  for (let key in itemCounts) {
    total += itemCounts[key]; // Her bir öğenin sayısını toplar
  }
  return total;
}

// Toplam sayıyı ID'si "total" olan elemana yazdıran fonksiyon
function updateTotalCount() {
  let total = getTotalCount(); // Toplamı al
  $("#total").text("(" + total + ")"); // ID'si "total" olan öğenin içeriğine yazdır
}

// Her bir butonun tıklanma olayını kontrol etme.
$("button").click(function () {
  const buttonElement = $(this); // Tıklanan buton elementini al.
  const spanId = buttonElement.find("span[id]").attr("id"); // Butondaki `span` elemanının id'sini al.

  if (isSilActive) return;

  buttonElement.find(".svg-resim").remove();
  buttonElement.addClass("active-button");
  buttonElement.find(".hiddenn").removeClass("hiddenn");
  buttonElement.css("cursor", "auto");

  if (itemCounts[spanId] === 0) increaseItem(spanId);

  setupSilEkleButtons(spanId, buttonElement);
});
