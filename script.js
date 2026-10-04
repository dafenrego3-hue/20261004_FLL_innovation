const SUPABASE_URL = "https://ksqauuhkeeavhavkhzch.supabase.co";
const SUPABASE_KEY = "sb_publishable_TWsX9lEaok49Kwcrt_vOhg_LICb91sU";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 生物データを取得
async function loadAnimals() {
    console.log("ボタンが押されました");

    const { data, error } = await supabaseClient
        .from("animal")
        .select("*");

    console.log("data:", data, "error:", error);

    if (error) {
        console.error(error);
        alert("データ取得に失敗しました: " + error.message);
        return;
    }

    const animalList = document.getElementById("animalList");
    animalList.innerHTML = "";

    if (data.length === 0) {
        animalList.textContent = "データが0件です(RLSの設定を確認してください)";
        return;
    }

    data.forEach(animal => {
        const div = document.createElement("div");
        div.className = "animal";
        div.innerHTML = `
            <h3>${animal.name}</h3>
            <p>地域:${animal.area}</p>
            <p>${animal.description ?? ""}</p>
        `;
        animalList.appendChild(div);
    });
}

// ボタンを押したら読み込む
document.getElementById("loadButton").addEventListener("click", loadAnimals);