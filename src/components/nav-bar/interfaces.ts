export interface NavBarProps {
    onEnterKeyDown(query: string): void | undefined;

    searchQuery: string;
}
