import { render, screen, fireEvent } from "@testing-library/react";
import { Categories } from "./Categories";

describe("Categories component", () => {
  const CATEGORIES = [
    { alias: "1", title: "Category 1" },
    { alias: "2", title: "Category 2" },
  ];
  const categorySelected = "1";
  const onClick = vi.fn();

  beforeEach(() => {
    render(
      <Categories
        categories={CATEGORIES}
        categorySelected={categorySelected}
        onClick={onClick}
      />
    );
  });

  test("renders all categories correctly", () => {
    const categoryElements = screen.getAllByTestId("category_test");

    expect(categoryElements.length).toBe(CATEGORIES.length);

    categoryElements.forEach((categoryElement, index) => {
      const category = CATEGORIES[index];
      expect(categoryElement.textContent).toBe(category.title);
    });
  });

  test("applies 'selected-category' class to the active category", () => {
    const activeCategoryElement = screen.getByText("Category 1");

    expect(activeCategoryElement.className).toContain(
      "selected-category"
    );
  });

  test("calls onClick when a category is clicked", () => {
    const categoryElement = screen.getByText("Category 2");
    fireEvent.click(categoryElement);

    expect(onClick).toHaveBeenCalledWith("2");
  });
});
