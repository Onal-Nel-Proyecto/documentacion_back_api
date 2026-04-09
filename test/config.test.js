import { test, expect } from "@jest/globals"

test("variable de entorno existe", () => {
  expect(process.env).toBeDefined()
})