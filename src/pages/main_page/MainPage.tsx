import { useEffect, useState } from "react";
import { Title, Loader, Group, TextInput, Button } from "@mantine/core";
import "@mantine/core/styles.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadVacancies, setPage, setSearch } from "../../store/vacanciesSlice";
import { VacancyCard } from "../../components/vacancy_card/VacancyCard";
import { PaginationBar } from "../../components/pagination_bar/PaginationBar";
import { SideBar } from "../../components/sidebar/SideBar";
import SearchIcon from "../../assets/search-icon.svg?react";
import classes from "./MainPage.module.css";

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const { items, loading, page, totalPages, search } = useAppSelector(
    (state) => state.vacancies
  );
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    dispatch(loadVacancies());
  }, [page, dispatch]);

  const handleSearch = () => {
    dispatch(setSearch(localSearch));
    dispatch(setPage(1));
    dispatch(loadVacancies());
  };

  return (
    <div className={classes.container}>
      <Group className={classes.header}>
        <div>
          <Title order={2} className={classes.title}>
            Список вакансий
          </Title>
          <p className={classes.subtitle}>по профессии Frontend-разработчик</p>
        </div>

        <Group className={classes.search}>
          <TextInput
            placeholder="Должность или название компании"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className={classes["search__input"]}
            leftSection={<SearchIcon />}
          />
          <Button
            className={classes["search__button"]}
            color="primary.4"
            onClick={handleSearch}
          >
            Найти
          </Button>
        </Group>
      </Group>

      <Group className={classes.content}>
        <SideBar />
        <main className={classes.vacancies}>
          {loading ? (
            <Loader />
          ) : (
            <>
              {items.map((vacancy) => (
                <VacancyCard key={vacancy.id} vacancy={vacancy} />
              ))}
              <PaginationBar
                page={page}
                total={totalPages}
                onChange={(p) => dispatch(setPage(p))}
              />
            </>
          )}
        </main>
      </Group>
    </div>
  );
};
