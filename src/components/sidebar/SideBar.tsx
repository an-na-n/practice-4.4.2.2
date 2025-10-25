import { Select } from "@mantine/core";
import { useAppDispatch } from "../../store/hooks";
import { setCity, loadVacancies, setPage } from "../../store/vacanciesSlice";
import { SkillsPills } from "../skills_pills/SkillsPills";
import classes from "./SideBar.module.css";
import clsx from "clsx";
import LocationPic from "../../assets/location-icon.svg?react";

export const SideBar = () => {
  const dispatch = useAppDispatch();

  const handleCityChange = (value: string | null) => {
    dispatch(setCity(value || "Все"));
    dispatch(setPage(1));
    dispatch(loadVacancies());
  };

  return (
    <aside className={classes.sidebar}>
      <section className={clsx(classes.block, classes["skills-block"])}>
        <SkillsPills />
      </section>

      <section
        className={clsx(classes.block, classes["city-block"], {
          dropdown: classes.dropdown,
        })}
      >
        <Select
          placeholder="Все города"
          data={["Все города", "Москва", "Санкт-Петербург"]}
          onChange={handleCityChange}
          className={classes.city}
          leftSection={<LocationPic />}
          comboboxProps={{ shadow: "md" }}
        />
      </section>
    </aside>
  );
};
