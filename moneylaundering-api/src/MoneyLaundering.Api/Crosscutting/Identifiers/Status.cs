namespace MoneyLaundering.Api.Crosscutting.Identifiers
{
    public static class Status
    {
        public static int Desestimado { get { return 3; } }
        public static int Finalizado { get { return 4;  } }
        public static int AnalistaAsignado { get { return 6; } }
        public static int SuperiorAsignado { get { return 10; } }
        public static int FalsoPositivo { get { return 2; } }
        public static int InformacionRecibida { get { return 8; } }

    }
}
