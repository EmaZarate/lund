using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Reflection;

namespace MoneyLaundering.Api.Infrastructure
{
    public class PropertyIgnoreContractResolver : DefaultContractResolver
    {
        private readonly Dictionary<Type, HashSet<string>> ignores;
        public PropertyIgnoreContractResolver()
        {
            this.ignores = new Dictionary<Type, HashSet<string>>();
        }

        public void IgnoreProperty<TClass>(string property) where TClass : class
        {
            if (!ignores.ContainsKey(typeof(TClass)))
            {
                ignores[typeof(TClass)] = new HashSet<string>();
            }

            ignores[typeof(TClass)].Add(property);
        }

        protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
        {
            var property = base.CreateProperty(member, memberSerialization);

            if (IsIgnored(property.DeclaringType, property.PropertyName))
            {
                property.ShouldSerialize = i => false;
                property.Ignored = true;
            }

            return property;
        }

        private bool IsIgnored(Type type, string jsonPropertyName)
        {
            return ignores.ContainsKey(type) && ignores[type].Contains(jsonPropertyName);
        }
    }
}
