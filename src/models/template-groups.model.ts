

export interface Token {
  id: string,
  code: number,
  name: string,
  tokenName: string,
  blockchainPrecision: number

}

export interface TokenParameter {
  inputAmountPerCollectionStrength: string,
  outputAmountPerCollectionStrength: string,
  inputModifier: null,
  outputModifier: null,
  passiveMultiplier: string,
  martiaMultiplier: string,
  token: Token
}
export interface TemplateGroup {
  id: string;
  key: string;
  name: string;
  tokenParameters: TokenParameter[]
}
