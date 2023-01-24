import { render, screen} from "@testing-library/react"
import HomePage from "./HomePage"
import renderer from 'react-test-renderer'

describe('HomePage', () => {

    test("render home heading", () => {
        render(<HomePage />);
        expect(screen.getByRole('heading')).toHaveTextContent(/Home Page/i);
    })

    test('snapshot', () => {
        const tree = renderer.create(<HomePage />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})