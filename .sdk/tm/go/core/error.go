package core

type ApicAgentError struct {
	IsApicAgentError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewApicAgentError(code string, msg string, ctx *Context) *ApicAgentError {
	return &ApicAgentError{
		IsApicAgentError: true,
		Sdk:              "ApicAgent",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *ApicAgentError) Error() string {
	return e.Msg
}
