"use client";

import React, { useState } from "react";
import "./GroupSettingsForm.scss";
import Image from "next/image";
import CardRuleLayout from "../CardRuleLayout/CardRuleLayout";

type Form = {
  image: string | null;
  rounds: number;
  win: number;
  draw: number;
  loss: number;
  teamsPerGroupAdvancing: number;
};

type KeyValue = "rounds" | "win" | "draw" | "loss" | "teamsPerGroupAdvancing";

function GroupSettingsForm() {
  const [form, setForm] = useState<Form>({
    image: null,
    rounds: 1,
    win: 3,
    draw: 1,
    loss: 0,
    teamsPerGroupAdvancing: 1,
  });

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setForm((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleIncrement = (key: KeyValue) => {
    if (form[key] === 9) return;
    setForm((prevState) => {
      if (typeof prevState[key] === "number") {
        return {
          ...prevState,
          [key]: Number(prevState[key]) + 1,
        };
      }
      return prevState;
    });
  };

  const handleDecrement = (key: KeyValue) => {
    if (form[key] === 0) return;

    setForm((prevState) => {
      if (typeof prevState[key] === "number") {
        return {
          ...prevState,
          [key]: prevState[key] - 1,
        };
      }
      return prevState;
    });
  };

  function handleOnSubmit(e: React.MouseEvent<HTMLFormElement, MouseEvent>) {
    e.preventDefault();
    // if (form.name === "") return;

    setForm({
      name: "",
      image: null,
      rounds: 1,
      win: 3,
      draw: 1,
      loss: 0,
      teamsPerGroupAdvancing: 1,
    });

    console.log(form);
    localStorage.setItem("groupSettings", JSON.stringify(form));
  }
  return (
    <>
      <CardRuleLayout title="Gruppspelsinställningar">
        <form
          onSubmit={handleOnSubmit}
          action=""
          className="group-settings-form"
        >
          {/* <label className="group-settings-form__label" htmlFor="image">
            <p>Omslag</p>
            <input
              type="file"
              id="image"
              name="filename"
              className="group-settings-form__label--upload-file"
            />
          </label> */}

          <label className="group-settings-form__label" htmlFor="rounds">
            <p>Antal möten</p>
            <section className="">
              <button
                type="button"
                onClick={() => {
                  if (form.rounds <= 1) return;
                  handleDecrement("rounds");
                }}
              >
                <span>-</span>
              </button>
              <span>{form.rounds}</span>
              <button type="button" onClick={() => handleIncrement("rounds")}>
                <span>+</span>
              </button>
            </section>
          </label>

          <label className="group-settings-form__label" htmlFor="win">
            <p>Poäng för vinst</p>
            <section className="">
              <button type="button" onClick={() => handleDecrement("win")}>
                <span>-</span>
              </button>

              <span>{form.win}</span>
              <button type="button" onClick={() => handleIncrement("win")}>
                <span>+</span>
              </button>
            </section>
          </label>

          <label className="group-settings-form__label" htmlFor="draw">
            <p>Poäng för oavgjort</p>
            <section className="">
              <button type="button" onClick={() => handleDecrement("draw")}>
                <span>-</span>
              </button>

              <span>{form.draw}</span>
              <button type="button" onClick={() => handleIncrement("draw")}>
                <span>+</span>
              </button>
            </section>
          </label>

          <label className="group-settings-form__label" htmlFor="lost">
            <p>Poäng för förlust</p>
            <section className="">
              <button type="button" onClick={() => handleDecrement("loss")}>
                <span>-</span>
              </button>
              <span>{form.loss}</span>
              <button type="button" onClick={() => handleIncrement("loss")}>
                <span>+</span>
              </button>
            </section>
          </label>

          <label className="group-settings-form__label" htmlFor="lost">
            <p>Antal lag per grupp vidare till slutspel</p>
            <section className="">
              <button
                type="button"
                onClick={() => {
                  if (form.teamsPerGroupAdvancing <= 1) return;
                  handleDecrement("teamsPerGroupAdvancing");
                }}
              >
                <span>-</span>
              </button>
              <span>{form.teamsPerGroupAdvancing}</span>
              <button
                type="button"
                onClick={() => handleIncrement("teamsPerGroupAdvancing")}
              >
                <span>+</span>
              </button>
            </section>
          </label>

          <input
            type="submit"
            value="Nästa"
            className="group-settings-form__submit-btn"
          />
        </form>
      </CardRuleLayout>
    </>
  );
}

export default GroupSettingsForm;