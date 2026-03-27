import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders menu tabs and blossom card intro by default', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        name: /벚꽃 카드를 화면의 주인공으로 전면에 세운 인트로/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: '벚꽃 카드 소개' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '역명판 카드 소개' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: '벚꽃 카드 이미지' })).toBeInTheDocument();
  });

  it('switches to the station sign experience when selecting the menu tab', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: '역명판 카드 소개' }));

    expect(
      screen.getByRole('heading', {
        name: /코레일 역명판 구조를 반영한 카드 전시/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getAllByText(/판매역 리스트/).length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: /서울 역명판 카드/i })).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole('button', { name: /부산/i })[0]);

    expect(screen.getByRole('heading', { name: /부산 역명판 카드/i })).toBeInTheDocument();
  });
});
