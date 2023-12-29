//Burada test edilecek şey sosların ekleme çıkarma yapıldığında toplam 
//fiyata etki edip etmediği

import { render, screen } from "@testing-library/react"
import Toppings from "."
import userEvent from "@testing-library/user-event"

test('API den gelen soslar için kartlar ekrana basılıyor mu', async () => {
    render(<Toppings/>)

    const images = await screen.findAllByAltText('sos-resim')

    expect(images.length).toBeGreaterThanOrEqual(1);
})


test('Sosların ekleme çıkarma işlemi toplam fiyatı etkiler', async() => {
    render(<Toppings/>)

    const user = userEvent.setup();

    const total = screen.getByRole('heading', {
        name: /soslar ücreti/i,
      });
    

    expect(total).toHaveTextContent(0);

    const toppings=  await screen.findAllByRole("checkbox")

    await user.click(toppings[0])

    expect(total).toHaveTextContent(3)

    await user.click(toppings[5])

    expect(total).toHaveTextContent(6)

    await user.click(toppings[5])
    expect(total).toHaveTextContent(3)

    await user.click(toppings[0])
    expect(total).toHaveTextContent(0)
    
    /* test edilme sırası
    1) toplam ücret başlığı çağrılır.
    2) İçinin sıfır olduğu kontrol edilir.
    3) bütün sosların checkboxlarını çağır
    4) soslardan birini sepete ekle
    5) total 3 e eşit mi kontrole t
    6) soslardan birini daha çağır 
    7) total 6 mı kontrol et
    8) tekrar aynı soslara ayrı ayrı tıklanır
    9) total 0 mı kontrol edilir.
    
    */
})