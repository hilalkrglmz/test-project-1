import { render, screen } from "@testing-library/react"
import Card from "."
import userEvent from "@testing-library/user-event"

const item = {
    name: 'Salted caramel', 
    imagePath: '/images/salted-caramel.png'
}

const basket =  [
{name: 'Salted caramel', imagePath: '/images/salted-caramel.png'},
{name: 'Salted caramel', imagePath: '/images/salted-caramel.png'},
{name: 'Chocolate', imagePath: '/images/chocolate.png'}

]


test('Card ekrana dogru basılıyor mu?', async () => {

const mock= jest.fn();

render(<Card item={item} basket={basket} setBasket={mock}/>)

screen.getByText(item.name)
const img = screen.getByAltText("çeşit-resim")
expect(img).toHaveAttribute('src', item.imagePath)

const amount= screen.getByTestId('amount')
expect(amount).toHaveTextContent(2);

const addBtn= screen.getByRole('button', {name: /ekle/i})
const delBtn= screen.getByRole('button', {name: /sıfırla/i})

const user = userEvent.setup()

await user.click(addBtn)

expect(mock).toHaveBeenCalledWith([...basket, item])

await user.click(delBtn)

const last = basket.filter((i) => i.name !== item.name)

expect(mock).toHaveBeenCalledWith(last)


})