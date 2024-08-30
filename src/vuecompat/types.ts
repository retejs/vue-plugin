import type VueNamespace from 'vue'

type Vue = typeof VueNamespace

export type Context = Vue extends { createApp: (arg: infer U) => any }
  ? U
  : (Vue extends new(options: infer U) => any ? U : any)

export type Instance = Vue extends { createApp: (arg: any) => infer U }
  ? U
  : (Vue extends new(options: any) => infer U ? U : any)
