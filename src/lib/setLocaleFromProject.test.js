/* globals describe, it, expect, jest */

jest.unmock("i18next");
import i18n from "i18next";
import { project } from "../fixtures/projectFixtures";
import { setLocaleFromProject } from "./setLocaleFromProject";

i18n.changeLanguage = jest.fn();

describe("setLocaleFromProject", () => {
  it("should not change locale if project locale is the same", () => {
    project.defaultLocale = "fr";
    i18n.language = "fr";
    setLocaleFromProject(project);
    expect(i18n.changeLanguage).not.toHaveBeenLastCalledWith("fr");
  });

  it("should change locale if project locale is different", () => {
    i18n.language = "en";
    project.defaultLocale = "fr";
    setLocaleFromProject(project);
    expect(i18n.changeLanguage).toHaveBeenLastCalledWith("fr");
  });
});
