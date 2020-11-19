import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { PluginComponent } from "./plugin.component";

describe("PluginComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PluginComponent],
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(PluginComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'natec-base-plugin'`, () => {
    const fixture = TestBed.createComponent(PluginComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("natec-base-plugin");
  });

  it("should render title in a h1 tag", () => {
    const fixture = TestBed.createComponent(PluginComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("h1").textContent).toContain(
      "Welcome to natec-base-plugin!"
    );
  });
});
