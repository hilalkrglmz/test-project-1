import { render, screen } from "@testing-library/react"
import Scoops from "."
import userEvent from "@testing-library/user-event";

test ("API'den gelen veriler için ekrana kartlar basılır" , async() => {
    render(<Scoops/>);

    const images= await screen.findAllByAltText('çeşit-resim');

    //gelen resimlerin sayısı >1 kontrolü

    expect(images.length).toBeGreaterThanOrEqual(1)
    
})

//*ekleme sıfırlama butonlarının işlevselliği 

test("Çeşit ekleme ve sıfırlamanın toplama etkisi", async () => {

    render(<Scoops/>)
    const user = userEvent.setup()

    const addButtons = await screen.findAllByRole('button', {
        name: 'Ekle'
    })
    const delButtons = await screen.findAllByRole('button', {
        name: 'Sıfırla'
    })
    const total = screen.getByRole("heading",{
        name:/Çeşitler ücreti/i,
    })

    expect(total).toHaveTextContent(0)

    await user.click(addButtons[0]); 

    expect(total).toHaveTextContent(20);

    await user.dblClick(addButtons[3]);

    expect(total).toHaveTextContent(60);

    await user.click(delButtons[0]);

    expect(total).toHaveTextContent(40);

    await user.click(delButtons[3]);

    expect(total).toHaveTextContent(0);



})

/* 2.test edilen hususlar

1- ekle ve sıfırlama butonları çağır
2- toplam spanı çağır
3- toplam spanı 0'dır
4- ekle butonlarından birine tıklanır
5- toplam fiyatı 20 olur
6- farklı bir çeşitten iki tane daha eklenir
7- toplam fiyat 60 olur
8- bir tane ekleneni sıfırlaya tıklanır
9- toplam fiyat 40 olur
10- 2 tane sıfırla butonuna tıklanır
11- toplam fiyat 0 olur.


*/