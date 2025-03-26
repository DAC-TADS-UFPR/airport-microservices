import { useEffect, useState } from "react";
enum VisibilityType {
  isElementInitialVisible = "isElementInitialVisible",
  isElementHalfVisible = "isElementHalfVisible",
  isElementFullyVisible = "isElementFullyVisible"
}

export function useVisibleSection(tag: string, visibilidade: string, classeActive: string, active?: any) {
  useEffect(() => {
    const selected = document.querySelectorAll(tag);
    const handleScroll = () => {
      selected.forEach((section) => {
        const isSectionVisible = visibleSectionObject(section, visibilidade, classeActive);
        if (isSectionVisible) {
          section.classList.add(classeActive);
          return true;
        } else {
          section.classList.remove(classeActive);
          return false;
        }
      });
    };

    // Attach the event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [tag, visibilidade, classeActive, active]);
}

function visibleSectionObject(element: Element, visibilidade: string, classe: string) {
  let visibilidadeFunction;

  switch (visibilidade) {
    case "isElementInitialVisible":
      visibilidadeFunction = isElementInitialVisible;
      break;
    case "isElementHalfVisible":
      visibilidadeFunction = isElementHalfVisible;
      break;
    case "isElementFullyVisible":
      visibilidadeFunction = isElementFullyVisible;
      break;
    default:
      visibilidadeFunction = isElementHalfVisible;
  }

  const container = element as HTMLElement;

  if (container && visibilidadeFunction(container)) {
    container.classList.add(classe);
    return true;
  } else {
    container.classList.remove(classe);
    return false;
  }
}

function isElementFullyVisible(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  // Verifica se o elemento está dentro da viewport verticalmente
  const isVerticalVisible = rect.top >= 0 && rect.bottom <= windowHeight && rect.height <= windowHeight;

  // Verifica se o elemento está dentro da viewport horizontalmente
  const isHorizontalVisible = rect.left >= 0 && rect.right <= windowWidth && rect.width <= windowWidth;

  return isVerticalVisible && isHorizontalVisible;
}
function isElementHalfVisible(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  // Verifica se pelo menos metade do elemento está visível verticalmente
  const isVerticalHalfVisible = rect.top + rect.height / 2 >= 0 && rect.bottom - rect.height / 2 <= windowHeight;

  // Verifica se pelo menos metade do elemento está visível horizontalmente
  const isHorizontalHalfVisible = rect.left + rect.width / 2 >= 0 && rect.right - rect.width / 2 <= windowWidth;

  return isVerticalHalfVisible && isHorizontalHalfVisible;
}
function isElementInitialVisible(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  // Verifica se pelo menos uma parte do elemento está dentro da viewport verticalmente
  const isVerticalVisible =
    (rect.top >= 0 && rect.bottom <= windowHeight) ||
    (rect.top <= 0 && rect.bottom >= 0) ||
    (rect.top <= windowHeight && rect.bottom >= windowHeight);

  // Verifica se pelo menos uma parte do elemento está dentro da viewport horizontalmente
  const isHorizontalVisible =
    (rect.left >= 0 && rect.right <= windowWidth) ||
    (rect.left <= 0 && rect.right >= 0) ||
    (rect.left <= windowWidth && rect.right >= windowWidth);

  return isVerticalVisible && isHorizontalVisible;
}
