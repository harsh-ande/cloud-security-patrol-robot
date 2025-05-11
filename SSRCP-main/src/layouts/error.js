export default function ErrorPage() {
  return (
    <div style={{ paddingLeft: "20rem", paddingTop: "10rem" }}>
      <div
        class="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div class="card text-center" style={{ width: "30rem" }}>
          <div class="card-body">
            <h5 class="card-title text-danger">Error: Not Logged In</h5>
            <p class="card-text">
              You must be logged in to view this page. Please sign in to continue.
            </p>
            <a href="/authentication/sign-in" class="btn btn-primary">
              Go to Sign In Page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
