import { render, screen, cleanup, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../components/App/App";
import SignIn from '../components/SignIn/SignIn';

describe('signin tests', () => {

    const initializeLogin = () => {
        const handleSubmit = jest.fn();
        const { view } = render(<SignIn onSubmit={handleSubmit} />);
        const username = screen.getByRole('textbox', { name: /username/i });
        const password = screen.getByLabelText(/password/i);
        const submitBtn = screen.getByRole('button', { name: /submit/i });
        return { username, password, submitBtn, handleSubmit };
    }

    const initializeApp = () => {
        const { view } = render(<App />);
        const username = screen.getByRole('textbox', { name: /username/i });
        const password = screen.getByLabelText(/password/i);
        const submitBtn = screen.getByRole('button', { name: /submit/i });
        return { username, password, submitBtn };
    }

    it('displays ui correctly', () => {
        const handleSubmit = jest.fn();
        const { view } = render(<SignIn onSubmit={handleSubmit} />);
        const username = screen.getByRole('textbox', { name: /username/i });
        const password = screen.getByLabelText(/password/i);
        const button = screen.getByRole('button', { name: /submit/i });
    });

    it('username/password cannot be empty', () => {
        const { username, password, submitBtn, handleSubmit } = initializeLogin();
        userEvent.type(username, 'pushpa');
        userEvent.type(password, 'fire hai');
        userEvent.click(submitBtn);
        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(username).toHaveValue('pushpa');
        expect(password).toHaveValue('fire hai');
    });

    it('btn shows loader when clicked', async () => {
        const { username, password, submitBtn } = initializeApp();
        userEvent.type(username, 'pushpa');
        userEvent.type(password, 'fire hai');
        userEvent.click(submitBtn);
        await waitFor(() => {
            screen.getByAltText('loader');
        })
        await waitForElementToBeRemoved(screen.queryByAltText('loader'), { timeout: 5000 }).then(() => {
            screen.debug();
            expect(screen.getByText(/pushpa/i)).toBeInTheDocument();
        });
    });

    it('invalid signin credentials case', async () => {
        const { username, password, submitBtn } = initializeApp();
        userEvent.type(username, 'pushpa');
        userEvent.type(password, 'flower hai');
        userEvent.click(submitBtn);
        await waitFor(() => {
            expect(screen.queryAllByText(/Either username or password incorrect/i))
        })
    });


})