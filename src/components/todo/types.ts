export interface Todo {
  id: number;
  title: string;
  description: string | null;
}

export interface TodoFormProps {
  todo?: Todo;
  onSuccess?: () => void;
}
