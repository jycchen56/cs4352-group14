type SelectedEvent = {
  title?: string;
  description?: string;
  imageUri?: string;
};

let current: SelectedEvent | null = null;

export function setSelectedEvent(e: SelectedEvent) {
  current = e;
}

export function getSelectedEvent(): SelectedEvent | null {
  return current;
}

export function clearSelectedEvent() {
  current = null;
}
