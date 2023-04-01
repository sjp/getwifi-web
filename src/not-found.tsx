import "./not-found.css";

export interface NotFoundRouteParams {
  path: string;
}

export interface NotFoundProps {
  params: Readonly<NotFoundRouteParams>;
}

export const NotFound = ({ params }: Readonly<NotFoundProps>) => {
  return (
    <>
      <h1>Not Found!!</h1>
      <p>Couldn&apos;t find a page at {params.path}</p>
    </>
  );
};
