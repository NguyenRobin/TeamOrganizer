import React from 'react';
import './FormSettingsWrapper.scss';
import Image from 'next/image';

type Props = {
  children: React.ReactNode;
  title: string;
  btn?: React.ReactNode;
};

function FormSettingsWrapper({ children, title, btn }: Props) {
  return (
    <section className="form-wrapper">
      <section className="form-wrapper__info">
        <section className="form-wrapper__title">
          <Image
            src="/golden-trophy-white-background.png"
            height={60}
            width={60}
            alt="grass"
          />
          <section>
            <h2>{title}</h2>
          </section>
        </section>
      </section>

      <section className="form-wrapper__children">{children}</section>

      {btn && <section className="form-wrapper__btn">{btn}</section>}
    </section>
  );
}

export default FormSettingsWrapper;
